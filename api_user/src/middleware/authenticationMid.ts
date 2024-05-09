import { Request, Response, NextFunction} from 'express';


export const checkForm = (req: Request, res: Response, next: NextFunction) => {	
		next();
	}