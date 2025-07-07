import { useScreenSizeStore } from './screenSizestate.store'
import { useTaskStore } from './task.store'
import { useUserStore } from './user.store'


export const resetAllStores = () => {
  useUserStore.getState().resetState()
  useTaskStore.getState().resetState()
  useScreenSizeStore.getState().resetState()
}
