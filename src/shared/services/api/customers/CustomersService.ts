import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import {
  ApiExceptionError,
  NotFoundError,
  CreateFailedError,
  UpdateFailedError,
} from "../axios-config/errors";
import { DeleteFailedError } from "../axios-config/errors/DeleteFailedError";

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

const getAll = async (
  page = 1,
  search = ""
): Promise<TCustomerWithTotal | Error> => {
  try {
    const { data, headers } = await Api.get<ICustomer[]>("/customers", {
      params: {
        _page: page,
        limit: Environment.DEFAULT_MAX_ITEMS,
        name_like: search,
      },
    });

    if (!data) {
      return ApiExceptionError;
    }

    return {
      data,
      total: Number(headers["x-total-count"] || Environment.DEFAULT_MAX_ITEMS),
    };
  } catch (error) {
    console.error(error);
    return ApiExceptionError;
  }
};

const getById = async (id: number): Promise<ICustomer | Error> => {
  try {
    const { data } = await Api.get<ICustomer>(`/customers/${id}`);
    if (!data) {
      return NotFoundError;
    }
    return data;
  } catch (error) {
    console.error(error);
    return ApiExceptionError;
  }
};

const create = async (
  customer: Omit<ICustomer, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICustomer>("/customers", customer);

    if (!data) {
      return CreateFailedError;
    }

    return data.id;
  } catch (error) {
    console.error(error);
    return CreateFailedError;
  }
};

const updateById = async (
  id: number,
  customer: Partial<ICustomer>
): Promise<void | Error> => {
  try {
    await Api.put(`/customers/${id}`, customer);
  } catch (error) {
    console.error(error);
    return UpdateFailedError;
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/customers/${id}`);
  } catch (error) {
    console.error(error);
    return DeleteFailedError;
  }
};

export const CustomersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
