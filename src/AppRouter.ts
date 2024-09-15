import { Router } from 'express';

/**
 * Represents a class for managing the application router.
 * Implements the singleton pattern to ensure only one Router instance in the application.
 */
export class AppRouter {
  //create a singleton Patter to only have on Router in the application
  private static Instance: Router;

  static getInstance(): Router {
    if (!AppRouter.Instance) {
      AppRouter.Instance = Router();
    }

    return AppRouter.Instance;
  }
}
