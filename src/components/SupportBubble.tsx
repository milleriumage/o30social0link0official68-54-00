import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, HelpCircle } from 'lucide-react';
import { SendMessageDialog } from '@/components/SendMessageDialog';
import { SupportDialog } from '@/components/SupportDialog';
import { AdminCreditsDialog } from '@/components/AdminCreditsDialog';

export default function SupportBubble() {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* RIC - Credit Request Button */}
      <Button
        onClick={() => setShowMessageDialog(true)}
        className="rounded-full h-14 w-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white mb-2"
        size="icon"
        title="Instant Credit Request"
      >
        <HelpCircle size={24} />
      </Button>

      {/* General Support Button */}
      <Button
        onClick={() => setShowSupportDialog(true)}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-white"
        size="icon"
        title="General Support"
      >
        <MessageSquare size={24} />
      </Button>
      
      {/* Admin Credits Dialog */}
      <AdminCreditsDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
      />

      {/* RIC Dialog */}
      <SendMessageDialog 
        isOpen={showMessageDialog} 
        setIsOpen={setShowMessageDialog} 
      />

      {/* Support Dialog */}
      <SupportDialog 
        isOpen={showSupportDialog} 
        setIsOpen={setShowSupportDialog} 
      />
    </div>
  );
}