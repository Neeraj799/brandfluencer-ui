import { authMiddleware } from "@/middlewares/authMiddleware";
import { chain } from "@/middlewares/chain";
import { I18nInterMiddleware } from "@/middlewares/I18nMiddleware";

export default chain([I18nInterMiddleware,authMiddleware]);


export const config = {

  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']

};
