export type NavigatorShare = {
  share? : (data? : ShareData) => Promise<void>;
}
type ShareData = {
  title? : string;
  text? : string;
  url? : string;
};
