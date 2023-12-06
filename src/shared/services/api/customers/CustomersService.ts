import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import {
  ApiExceptionError,
  NotFoundError,
  CreateFailedError,
} from "../axios-config/errors";

interface ICustomer {
  id: number;
  name: string;
  email: string;
  cityId: number;
}

type TCustomerWithTotal = {
  data: ICustomer[];
  total: number;
};

const getAll = async (page = 1, search = ""): Promise<TCustomerWithTotal> => {
  try {
    const { data, headers } = await Api.get<ICustomer[]>("/customers", {
      params: {
        _page: page,
        limit: Environment.DEFAULT_MAX_ITEMS,
        name_like: search,
      },
    });

    return {
      data,
      total: Number(headers["x-total-count"] || Environment.DEFAULT_MAX_ITEMS),
    };
  } catch (error) {
    console.error(error);
    throw ApiExceptionError;
  }
};

const getById = async (id: number): Promise<ICustomer> => {
  try {
    const { data } = await Api.get<ICustomer>(`/customers/${id}`);
    if (!data) {
      throw NotFoundError;
    }
    return data;
  } catch (error) {
    console.error(error);
    if (error === NotFoundError) {
      throw NotFoundError;
    }
    throw ApiExceptionError;
  }
};

const create = async (customer: Omit<ICustomer, "id">): Promise<number> => {
  try {
    const { data } = await Api.post<ICustomer>("/customers", customer);

    if (!data) {
      throw CreateFailedError;
    }

    return data.id;
  } catch (error) {
    console.error(error);
    if (error === CreateFailedError) {
      throw CreateFailedError;
    }
    throw ApiExceptionError;
  }
};

const updateById = async (
  id: number,
  customer: Partial<ICustomer>
): Promise<void> => {
  try {
    await Api.put(`/customers/${id}`, customer);
  } catch (error) {
    console.error(error);
    throw ApiExceptionError;
  }
};

const deleteById = async (id: number): Promise<void> => {
  try {
    await Api.delete(`/customers/${id}`);
  } catch (error) {
    console.error(error);
    throw ApiExceptionError;
  }
};

export const CustomersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
