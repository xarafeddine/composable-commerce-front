"use client";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";

interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

const InstallBtn = () => {
  const [bipEvent, setBipEvent] = useState<BeforeInstallPromptEvent | null>(
    null
  );

  useEffect(() => {
    const beforeInstallPromptHandler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setBipEvent(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      beforeInstallPromptHandler as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler as EventListener
      );
    };
  }, []);

  const handleClick = () => {
    if (bipEvent) {
      bipEvent.prompt();
    } else {
      // incompatible browser, your PWA is not passing the criteria, the user has already installed the PWA
      // TODO: show the user information on how to install the app
      alert(
        "To install the app look for Add to Homescreen or Install in your browser's menu"
      );
    }
  };

  return (
    <div className="flex flex-row cursor-pointer" onClick={handleClick}>
      <BiDownload size="25px" color="white" />
      <span className="ml-2">Install</span>
    </div>
  );
};

export default InstallBtn;
