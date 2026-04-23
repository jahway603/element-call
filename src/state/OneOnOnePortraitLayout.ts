/*
Copyright 2024 New Vector Ltd.
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

import {
  type OneOnOnePortraitLayout,
  type OneOnOnePortraitLayoutMedia,
} from "./layout-types";
import { type TileStore } from "./TileStore";

/**
 * Produces a one-on-one portrait layout with the given media.
 */
export function oneOnOnePortraitLayout(
  media: OneOnOnePortraitLayoutMedia,
  prevTiles: TileStore,
): [OneOnOnePortraitLayout, TileStore] {
  const update = prevTiles.from(media.pip === undefined ? 1 : 2);
  if (media.pip !== undefined) update.registerGridTile(media.pip);
  update.registerGridTile(media.spotlight);
  const tiles = update.build();
  return [
    {
      type: media.type,
      spotlight: tiles.gridTilesByMedia.get(media.spotlight)!,
      pip: media.pip && tiles.gridTilesByMedia.get(media.pip)!,
    },
    tiles,
  ];
}
