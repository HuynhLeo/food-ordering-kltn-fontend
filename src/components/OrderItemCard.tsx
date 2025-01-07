import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getDateAndTime = () => {
    const created = new Date(order.createdAt);

    // Chuyển đổi sang múi giờ Việt Nam (UTC+7)
    const vietnamDate = created.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const vietnamTime = created.toLocaleTimeString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${vietnamDate} ${vietnamTime}`; // Kết hợp ngày và giờ
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  // Tính tổng chi phí đơn hàng
  const calculateTotalAmount = () => {
    return order.cartItems.reduce((total, item) => {
      // Tìm món ăn trong menuItems
      const menuItem = order.restaurant.menuItems.find((menuItem) => menuItem._id === item.menuItemId);
      if (menuItem && menuItem.price && item.quantity) {
        const quantity = parseInt(item.quantity);
        if (!isNaN(quantity)) {
          return total + menuItem.price * quantity;
        }
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Tên khách hàng:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Địa chỉ giao hàng:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Thời gian:
            <span className="ml-2 font-normal">{getDateAndTime()}</span>
          </div>
          <div>
            Phí giao hàng:
            <span className="ml-2 font-normal">
              {formatCurrency(3000000 / 100)}
            </span>
          </div>
          <div>
            Tổng chi phí:
            <span className="ml-2 font-normal inline-block">
              {formatCurrency((totalAmount + 3000000) / 100)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Trạng thái đơn hàng</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
