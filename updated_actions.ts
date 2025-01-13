
import { VisibilityType } from './types';

export const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred';
};

export const getVisibility = (type: VisibilityType): string => {
    return type;
};
