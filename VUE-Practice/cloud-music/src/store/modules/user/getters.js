import { isDefined } from "@/utils"

export const isLogin = (state) => isDefined(state.user)



