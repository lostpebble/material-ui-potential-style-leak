```
yarn install
```

Start our mini server

```
npm start
```

Run the "load tester" - runner that hits the server 100 times

```
npm hit-it
```

To see the memory leak you should open the url in Chrome `chrome://inspect` and go to "Open dedicated DevTools for Node".

Under the Memory tab, you can take snapshots.

* Take initial snapshot on server start
* Run `npm hit-it`
* Take another snapshot
* Run `npm hit-it` again
* Take a final snapshot
* While selecting the final snapshot, at the top change where it says "All Objects" to "Objects allocated between Snapshot 2 and Snapshot 3"

You should now see the top offenders for the memory leak are all related to styling - the `(array)` and `Object` types as well only contain styling-related data.
