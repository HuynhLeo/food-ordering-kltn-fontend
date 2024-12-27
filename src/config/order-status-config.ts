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
    value: "Đang chờ xác nhận từ nhà hàng",
    progressValue: 25,
  },
  { label: "Đang xử lý", value: "Đang xử lý", progressValue: 50 },
  { label: "Đang giao", value: "Đang giao", progressValue: 75 },
  { label: "Đã giao", value: "Đã giao", progressValue: 100 },
];
