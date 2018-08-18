export interface UpdateEvent {
  subject?: any;
  type: string;
  property?: string;
  oldValue?: any;
  currentValue: any;
  context?: any;
}
