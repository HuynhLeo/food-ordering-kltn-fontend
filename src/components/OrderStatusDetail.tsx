import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  // Hàm tính tiền với định dạng
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  // Hàm tính tổng tiền giỏ hàng
  const calculateTotalAmount = (
    cartItems: { menuItemId: string; quantity: string }[],
    menuItems: { _id: string; price: number }[]
  ) => {
    return cartItems.reduce((total, item) => {
      const menuItem = menuItems.find((menu) => menu._id === item.menuItemId);
      if (menuItem) {
        // Tính tổng tiền cho mỗi món
        total += menuItem.price * parseInt(item.quantity, 10);
      }
      return total;
    }, 0);
  };

  // Tính tổng tiền từ cartItems
  const totalAmount = calculateTotalAmount(order.cartItems, order.restaurant.menuItems);

  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Giao hàng tới:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Đơn hàng của bạn</span>
        <ul>
          {order.cartItems.map((item, index) => {
            const menuItem = order.restaurant.menuItems.find(
              (menu) => menu._id === item.menuItemId
            );
            const itemTotal = menuItem ? menuItem.price * parseInt(item.quantity, 10) : 0;

            return (
              <li key={index}>
                {item.name} x {item.quantity} = {menuItem ? formatCurrency(itemTotal / 100) : "Giá không có sẵn"}
              </li>
            );
          })}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Phí giao hàng</span>
        <span>{formatCurrency(30000)}</span>
        <span className="font-bold">Tổng cộng</span>
        <span>{formatCurrency((totalAmount + 3000000) / 100)}</span> {/* Chia / 1000 trước khi hiển thị */}
      </div>
    </div>
  );
};

export default OrderStatusDetail;
