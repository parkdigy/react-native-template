import React from 'react';
import {TermsOfPrivacyContent} from '../TermsOfPrivacyContent';
import {FullScreenDialog} from '../../Dialog/FullScreenDialog';
import {TermsOfPrivacyDialogProps as Props} from './TermsOfPrivacyDialog.types';

export const TermsOfPrivacyDialog = ({visible, onRequestClose}: Props) => {
  return (
    <FullScreenDialog
      fullWidth
      fullHeight
      animationType='fade'
      title='개인정보처리방침'
      visible={visible}
      onRequestClose={onRequestClose}>
      <TermsOfPrivacyContent />
    </FullScreenDialog>
  );
};

export default TermsOfPrivacyDialog;
