export interface ProductContextType {
    getListProduct: (callback?: VoidFunction) => void;
    listProduct: (DataProduct[]);
    addToCart: (item: DataProduct) => void;
    productInCart: (DataProduct[]);
    removeFromCart: () => void;
    getProductById: (id: DataProduct['id']) => Promise<void>;
    selectedItem: (DataProduct);
    totalMoney: number;
    onChangeQuantity: (quantity: DataProduct['quantity'], id: DataProduct['id']) => void;
    deleteItemInCart: (id: DataProduct['id']) => void;
}

export type DataProduct = {
    id: number;
    name: string;
    price: number;
    description: string;
    type?: string;
    brand?: string;
    photos: string;
    createdAt?: Date;
    updateAt?: Date;
    quantity?: number;
}

export interface ListProductResponse {
    data: DataProduct[];
    statusCode: number;
}

export interface Item {
    data: DataProduct;
    statusCode: number;
}