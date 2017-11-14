export interface IPushNotifications {
    init(): void;
    hasPermission(): Promise<any>;
    register(): void;
    unregister(): void;
}