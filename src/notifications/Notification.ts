import Alert from 'react-s-alert';

export enum AlertPositions {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  TOP = 'top',
  BOTTOM = 'bottom'
}

export enum AlertEffects {
  SLIDE = 'slide',
  SCALE = 'scale',
  BOUNCYFLIP = 'bouncyflip',
  FLIP = 'flip',
  GENIE = 'genie',
  JELLY = 'jelly',
  STACKSLIDE = 'stackslide'
}

export enum AlertTypes {
  SUCCESS,
  ERROR,
  WARNING,
  INFO
}

export const getDefaultAlertOptions = () => {
  return {
    position: 'top-right',
    effect: 'slide',
    html: true,
    alertType: AlertTypes.INFO,
    timeout: 2000
  }
};

export class AlertNotification {
  private readonly alertType: AlertTypes;
  private readonly message: string;
  private readonly options: object;

  constructor(
    alertType: AlertTypes,
    position: string,
    effect: string,
    allowHtml: boolean,
    timeout: number,
    message: string
  ) {
    this.alertType = alertType;
    this.message = message;

    this.options = {
      position: position,
      effect: effect,
      timeout: timeout,
      html: allowHtml
    };
  }

  show(message?: string): void {
    const text = message ? message : this.message;

    switch (this.alertType) {
      case AlertTypes.SUCCESS:
        Alert.success(text, this.options);
        break;
      case AlertTypes.WARNING:
        Alert.warning(text, this.options);
        break;
      case AlertTypes.INFO:
        Alert.info(text, this.options);
        break;
      case AlertTypes.ERROR:
        Alert.error(text, this.options);
        break;
    }
  }
}

export class NotificationBuilder {
  private alertType: AlertTypes;
  private position: string;
  private effect: string;
  private allowHtml: boolean;
  private timeout: number;
  private message = '';

  constructor() {
    const defaultOptions = getDefaultAlertOptions()
    this.alertType = defaultOptions.alertType;
    this.position = defaultOptions.position;
    this.effect = defaultOptions.effect;
    this.allowHtml = defaultOptions.html;
    this.timeout = defaultOptions.timeout;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setType(alertType: AlertTypes) {
    this.alertType = alertType;
    return this;
  }

  setPosition(position: AlertPositions) {
    this.position = position;
    return this;
  }

  setEffect(effect: AlertEffects) {
    this.effect = effect;
    return this;
  }

  allowHTML(html: boolean) {
    this.allowHtml = html;
    return this;
  }

  setTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  build() {
    return new AlertNotification(
      this.alertType,
      this.position,
      this.effect,
      this.allowHtml,
      this.timeout,
      this.message
    );
  }
}
