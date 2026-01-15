export interface IntegrationParams {
    integrationId: string
    professionalId?: string
    provider?: IntegrationsProviders
    accessToken?: string
    refreshToken?: string
    tokenExpiresAt?: string
    active?: boolean
    autoCreateMeetLinks?: boolean
    autoSendMeetLinks?: boolean
    syncAppWithCalendar?: boolean
    showEventsInAgenda?: boolean
    updatedAt: Date
    createdAt: Date
};

export type IntegrationsProviders =  "google"| "zoom";