export interface PostReport {
    postId?: string;
    userId?: string;
    reason?: string;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaymentData  {
    amount: number,
    anonymousName: string ,
    userId: string,
    beneficiaryId: string,
  };