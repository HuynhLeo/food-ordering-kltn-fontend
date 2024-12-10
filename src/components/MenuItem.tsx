import { MenuItem as MenuItemType } from "../types";  // Đổi tên kiểu dữ liệu để tránh xung đột
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuCard = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {(menuItem.price / 100000).toFixed(3)} VND
      </CardContent>
    </Card>
  );
};

export default MenuCard;
