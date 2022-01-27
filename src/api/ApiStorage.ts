import { FileInfo } from "../classes/FileInfo";
import App from "./App";

class ApiStorage {
  app: App;
  constructor(app: App) {
    this.app = app;
  }
  uploadFile(
    pathRef: string,
    file: any,
    onPercentageUpdate: (res: number) => void,
    onComplete: (data: FileInfo) => void,
    onError: (err: any) => void
  ) {
    const storage = this.app.storage();
    const doc = storage.ref(pathRef);
    const task = doc.put(file);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onPercentageUpdate(percentage);
      },
      (error) => {
        console.error(error.message);
        onError(error);
      },
      () => {
        // Upload complete
        doc.getDownloadURL().then((url) => {
          onComplete({
            urlDownload: url,
            path: pathRef,
            docRef: doc,
            remove: () => {
              doc.delete();
            },
          });
        });
      }
    );
  }
}
export default ApiStorage;
