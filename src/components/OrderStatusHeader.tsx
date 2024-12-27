import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    // Chuyển đổi sang múi giờ Việt Nam (UTC+7)
    const vietnamTime = created.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });

    const [time] = vietnamTime.split(", ");
    const [hours, minutes] = time.split(":");

    return `${hours}:${minutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Trạng thái đơn hàng: {getOrderStatusInfo().label}</span>
        <span> Thời gian đặt hàng: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
