import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import {
  ApiExceptionError,
  NotFoundError,
  CreateFailedError,
} from "../axios-config/errors";

export interface ICities {
  id: number;
  name: string;
}

type TCitiesWithTotal = {
  data: ICities[];
  total: number;
};

const getAll = async (page = 1, search = ""): Promise<TCitiesWithTotal> => {
  try {
    const { data, headers } = await Api.get<ICities[]>("/cities", {
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

const getById = async (id: number): Promise<ICities> => {
  try {
    const { data } = await Api.get<ICities>(`/cities/${id}`);
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

const create = async (city: Omit<ICities, "id">): Promise<number> => {
  try {
    const { data } = await Api.post<ICities>("/cities", city);

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
  city: Partial<ICities>
): Promise<void> => {
  try {
    await Api.put(`/cities/${id}`, city);
  } catch (error) {
    console.error(error);
    throw ApiExceptionError;
  }
};

const deleteById = async (id: number): Promise<void> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    throw ApiExceptionError;
  }
};

export const CitiesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
