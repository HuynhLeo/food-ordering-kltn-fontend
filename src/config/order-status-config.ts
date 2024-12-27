import { OrderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Đã đặt", value: "Đã đặt", progressValue: 0 },
  {
    label: "Đang chờ xác nhận từ nhà hàng",
    value: "paid",
    progressValue: 25,
  },
  { label: "Đang xử lý", value: "inProgress", progressValue: 50 },
  { label: "Đang giao", value: "outForDelivery", progressValue: 75 },
  { label: "Đã giao", value: "delivered", progressValue: 100 },
];
