import { ApiRequestParams, handleRequest } from "../API";
import { Comment } from "../interfaces/comment";

type CommentArgs = {
    path: string;
    data?: Comment;
    headers?: any,
    fullObjects?: boolean;
    version?: string
}

export const getComments = async ({path, data, headers}: CommentArgs) => {
    const options: ApiRequestParams = {
        data,
        headers
    }
    return handleRequest('get', path, options)
}

export const getCommentsQuery = ({
    path,
    data,
    headers
}: CommentArgs) => ({
    queryKey: [path, 'get', 'comment'],
    queryFn: async () => getComments({path, data, headers})
})