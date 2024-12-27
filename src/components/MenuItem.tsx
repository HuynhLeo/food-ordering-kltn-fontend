import { MenuItem as MenuItemType } from "../types";  // Đổi tên kiểu dữ liệu để tránh xung đột
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuCard = ({ menuItem, addToCart }: Props) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const price = typeof menuItem.price === "number" ? menuItem.price : 0;

  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {formatCurrency(price)}
      </CardContent>
    </Card>
  );
};

export default MenuCard;

