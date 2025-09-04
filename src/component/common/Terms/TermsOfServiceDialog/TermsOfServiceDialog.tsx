import React from 'react';
import {TermsOfServiceContent} from '../TermsOfServiceContent';
import {FullScreenDialog} from '../../Dialog/FullScreenDialog';
import {TermsOfServiceDialogProps as Props} from './TermsOfServiceDialog.types';

export const TermsOfServiceDialog = ({visible, onRequestClose}: Props) => {
  return (
    <FullScreenDialog
      fullWidth
      fullHeight
      animationType='fade'
      duration={350}
      title='이용약관'
      visible={visible}
      onRequestClose={onRequestClose}>
      <TermsOfServiceContent />
    </FullScreenDialog>
  );
};

export default TermsOfServiceDialog;
