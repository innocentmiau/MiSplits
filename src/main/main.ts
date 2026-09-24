import { app, BrowserWindow } from "electron";
import path from "node:path";

function createWindow(): void {
  const window = new BrowserWindow({
    width: 420,
    height: 160,
    minWidth: 200,
    minHeight: 80,
    title: "MiSplits",
    backgroundColor: "#111111",
    autoHideMenuBar: true,
  });

  window.loadFile(path.join(import.meta.dirname, "../renderer/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  // macOS keeps apps running with no windows; clicking the dock icon should reopen one.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
