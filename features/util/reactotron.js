import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({
    name: 'Elevator3.LetMeLift',
  })
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect();
}
