export interface PlanAttributes {
  planId?: string;
  name: string;
  price: number;
  currency: string;
  features: {
    maxAppointmentsPerMonth?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // flexibilidad para más features en el futuro
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubscriptionAttributes {
  subscriptionId?: string;
  userId: string;
  planId: string;
  status: "active" | "canceled" | "paused";
  startDate: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  plan: PlanAttributes;
}