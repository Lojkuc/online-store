type data = Array<IDataObj>;

interface IDataObj {
    id: string;
    name: string;
    price: number;
    image: string;
    colors: string[];
    company: string;
    description: string;
    category: string;
    shipping: string;
}

export { data, IDataObj };
