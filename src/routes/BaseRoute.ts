import { Router } from 'express';

export class BaseRoutes {
    public static mountApi(__app: Router) {}

    public static mountWeb(__app: Router) {}
}
