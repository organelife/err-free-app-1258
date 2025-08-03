import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Registration, ApplicationStatus, RegistrationsPermissions } from './types';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RegistrationApprovalActionsProps {
  registration: Registration;
  permissions: RegistrationsPermissions;
  onStatusUpdate: () => void;
}

const RegistrationApprovalActions: React.FC<RegistrationApprovalActionsProps> = ({
  registration,
  permissions,
  onStatusUpdate
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'reset'>('approve');

  const getCurrentAdmin = () => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      return sessionData.username;
    }
    return 'system';
  };

  const handleApproval = async (action: 'approve' | 'reject' | 'reset', actionNotes?: string) => {
    if (!permissions.canWrite) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to update registrations.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const currentAdmin = getCurrentAdmin();
      console.log('Attempting approval with:', { action, registration: registration.id, admin: currentAdmin, notes: actionNotes });
      
      let result;
      switch (action) {
        case 'approve':
          console.log('Calling approve_registration RPC...');
          result = await supabase.rpc('approve_registration', {
            registration_id: registration.id,
            approver_username: currentAdmin,
            notes: actionNotes || null
          });
          console.log('Approve result:', result);
          break;
        case 'reject':
          console.log('Calling reject_registration RPC...');
          result = await supabase.rpc('reject_registration', {
            registration_id: registration.id,
            rejector_username: currentAdmin,
            notes: actionNotes || null
          });
          console.log('Reject result:', result);
          break;
        case 'reset':
          console.log('Calling reset_registration_approval RPC...');
          result = await supabase.rpc('reset_registration_approval', {
            registration_id: registration.id
          });
          console.log('Reset result:', result);
          break;
      }

      if (result.error) {
        console.error('RPC Error:', result.error);
        throw result.error;
      }

      toast({
        title: "Success",
        description: `Registration ${action}d successfully.`
      });

      onStatusUpdate();
      setIsDialogOpen(false);
      setNotes('');
    } catch (error) {
      console.error(`${action} failed:`, error);
      toast({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
        description: `Failed to ${action} registration.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (type: 'approve' | 'reject' | 'reset') => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  const getDialogTitle = () => {
    switch (actionType) {
      case 'approve': return 'Approve Registration';
      case 'reject': return 'Reject Registration';
      case 'reset': return 'Reset Registration';
      default: return 'Update Registration';
    }
  };

  const getDialogDescription = () => {
    switch (actionType) {
      case 'approve': return 'Are you sure you want to approve this registration?';
      case 'reject': return 'Are you sure you want to reject this registration?';
      case 'reset': return 'Are you sure you want to reset this registration to pending?';
      default: return '';
    }
  };

  if (!permissions.canWrite) {
    return null;
  }

  console.log('RegistrationApprovalActions rendering for:', registration.customer_id, 'status:', registration.status, 'permissions:', permissions);

  return (
    <div className="flex gap-2">
      {registration.status === 'pending' && (
        <>
          <Button
            size="sm"
            onClick={() => {
              console.log('RegistrationApprovalActions approve clicked for:', registration.id);
              openDialog('approve');
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            <CheckCircle className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              console.log('RegistrationApprovalActions reject clicked for:', registration.id);
              openDialog('reject');
            }}
            disabled={isLoading}
          >
            <XCircle className="h-3 w-3" />
          </Button>
        </>
      )}
      
      {(registration.status === 'approved' || registration.status === 'rejected') && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            console.log('RegistrationApprovalActions reset clicked for:', registration.id);
            openDialog('reset');
          }}
          disabled={isLoading}
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">{getDialogDescription()}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this action..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleApproval(actionType, notes)}
                disabled={isLoading}
                className={
                  actionType === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : actionType === 'reject'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }
              >
                {isLoading ? 'Processing...' : `Confirm ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationApprovalActions;