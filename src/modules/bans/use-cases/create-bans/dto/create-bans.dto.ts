export interface CreateBansDto {
  id: string;
  card_name: string;
  reason: string;
  ban_date: Date;
}

export interface CreateBansInputDto {
  card_name: string;
  reason: string;
  ban_date: Date;
}