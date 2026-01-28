export interface AgreementPanelItemCommand {
  getName(): string;
  getChecked(): boolean;
  setChecked(checked: boolean): void;
}

export interface AgreementPanelItemProps {
  ref?: Ref<AgreementPanelItemCommand>;
  name: string;
  title: string;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?(checked: boolean): void;
  onDetailPress?(): void;
}
