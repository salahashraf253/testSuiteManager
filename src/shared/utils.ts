import { Types } from "mongoose"

export function _idToid<T extends { _id: Types.ObjectId } >(resource: T): Omit<T, '_id'> & { 'id': Types.ObjectId }  {

    const { _id, ...otherProps } = resource

    return Object.assign(otherProps, {
        id: _id
    }) as T & { id: Types.ObjectId }

}