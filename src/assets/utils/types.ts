type data = Array<IDataObj>;
type categoryArr = Array<IForCategpry>;
type companyArr = Array<IForCompany>;

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
  stock: number;
  count: number;
}

interface IArrayParams {
  name: string;
  value: string[];
}

interface IForCompany {
  company: string;
  stock: number;
}
interface IForCategpry {
  category: string;
  stock: number;
}

export { data, IDataObj, categoryArr, companyArr, IArrayParams };
