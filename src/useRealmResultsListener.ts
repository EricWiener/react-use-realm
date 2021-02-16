import * as React from "react";
import useForceUpdate from "use-force-update";
import { useCallback } from "react";
import { delay } from "./utils";

export default function useRealmResultsListener<T>(
  query: Realm.Results<T> | undefined,
  delayTime: number = 0
) {
  const forceUpdate = useForceUpdate();

  const delayAmount = delayTime ? delayTime : 0;
  const realmUpdateCounter = React.useRef(0);

  const delayedForceUpdate = useCallback(async () => {
    // Check what the current counter is it
    const count = realmUpdateCounter.current;

    // Update the counter ref
    realmUpdateCounter.current += realmUpdateCounter.current;

    // Wait a bit for any new updates
    await delay(delayAmount);

    // Check if a new update came in and changed the counter
    if (realmUpdateCounter.current !== count) {
      // Skip the update because another update came in
      console.log('useRealmResultsListener skipping update');
      return;
    }
    forceUpdate();
  }, [forceUpdate, delayAmount]);

  React.useEffect(() => {
    function handleChange(
      _collection: Realm.Collection<T>,
      changes: Realm.CollectionChangeSet
    ) {
      const {
        insertions,
        newModifications,
        oldModifications,
        deletions,
      } = changes;
      if (
        insertions.length +
          newModifications.length +
          oldModifications.length +
          deletions.length >
        0
      ) {
        delayedForceUpdate();
      }
    }

    if (query) {
      query.addListener(handleChange);
      return () => query.removeListener(handleChange);
    }
  }, [query, delayedForceUpdate]);

  return query;
}
