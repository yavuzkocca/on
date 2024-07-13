import { memo, useCallback } from "react";

import { useColorScheme } from "@showtime-xyz/universal.color-scheme";
import { Image } from "@showtime-xyz/universal.image";
import {
  InfiniteScrollList,
  InfiniteScrollListProps,
} from "@showtime-xyz/universal.infinite-scroll-list";
import { Skeleton } from "@showtime-xyz/universal.skeleton";
import { Text } from "@showtime-xyz/universal.text";
import { VerificationBadge } from "@showtime-xyz/universal.verification-badge";
import { View } from "@showtime-xyz/universal.view";

import { useMyInfo } from "app/hooks/api-hooks";
import { useFollow } from "app/hooks/use-follow";
import { useModalListProps } from "app/hooks/use-modal-list-props";
import { usePlatformBottomHeight } from "app/hooks/use-platform-bottom-height";
import { Link } from "app/navigation/link";
import { formatAddressShort } from "app/utilities";

import { MyInfo } from "../types";
import { EmptyPlaceholder } from "./empty-placeholder";
import { FollowButton } from "./follow-button";

type FollowingListProp = {
  follow: (profileId: string) => void;
  unFollow: (profileId: string) => void;
};
type UserListProps = Pick<InfiniteScrollListProps<any>, "style"> & {
  users?: MyInfo[];
  loading: boolean;
  emptyTitle?: string;
};
export const UserList = ({
  users,
  loading,
  emptyTitle = "No results found",
  ...rest
}: UserListProps) => {
  const { follow, unfollow } = useMyInfo();
  const modalListProps = useModalListProps();
  const bottom = usePlatformBottomHeight();
  const keyExtractor = useCallback(
    (item: MyInfo) => `${item.profile.profile_id}`,
    []
  );

  console.log(`USERSSSSS: ${JSON.stringify(users)}`);

  const renderItem = useCallback(
    ({ item }: { item: MyInfo }) => {
      return (
        <FollowingListUser item={item} follow={follow} unFollow={unfollow} />
      );
    },
    [unfollow, follow]
  );
  const listEmptyComponent = useCallback(
    () => (
      <EmptyPlaceholder
        title={emptyTitle}
        tw="h-full min-h-[40px] flex-1 items-center justify-center"
        hideLoginBtn
      />
    ),
    [emptyTitle]
  );
  if (loading) {
    return <FollowingUserItemLoadingIndicator />;
  }

  return (
    <InfiniteScrollList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      estimatedItemSize={64}
      overscan={64}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={{ paddingBottom: bottom }}
      {...modalListProps}
      {...rest}
    />
  );
};

const SEPARATOR_HEIGHT = 1;
const Separator = () => (
  <View
    tw={`bg-gray-200 dark:bg-gray-800`}
    style={{ height: SEPARATOR_HEIGHT }}
  />
);

const ITEM_HEIGHT = 64 + SEPARATOR_HEIGHT;

const FollowingListUser = memo(
  ({ item }: { item: MyInfo } & FollowingListProp) => {
    const { data } = useMyInfo();
    console.log(`USERLISTFFF=${JSON.stringify(item)}`);

    const { onToggleFollow } = useFollow({
      username: data?.data?.data?.profile?.username,
    });
    return (
      <View
        tw={`flex-row items-center justify-between overflow-hidden px-4`}
        style={{ height: ITEM_HEIGHT }}
      >
        <Link
          href={`/@${item?.username ?? item?.wallet_address}?type=created`}
          tw="flex-1"
          viewProps={{ style: { flex: 1 } }}
        >
          <View tw="flex-row">
            <View tw="mr-2 h-8 w-8 rounded-full bg-gray-200">
              {item?.img_url && (
                <Image
                  source={{ uri: item?.img_url }}
                  alt={item?.username ?? item?.wallet_address}
                  tw="rounded-full"
                  width={32}
                  height={32}
                />
              )}
            </View>
            <View tw="mr-1 flex-1 justify-center">
              {item?.name ? (
                <>
                  <Text
                    tw="text-sm font-semibold text-gray-600 dark:text-gray-300"
                    numberOfLines={1}
                  >
                    {item?.name}
                  </Text>
                  <View tw="h-1" />
                </>
              ) : null}

              <View tw="flex-row items-center">
                <Text
                  tw="max-w-[120px] text-sm font-semibold text-gray-900 dark:text-white"
                  numberOfLines={1}
                >
                  {item?.username ? (
                    <>@{item?.username}</>
                  ) : (
                    <>{formatAddressShort(item?.wallet_address)}</>
                  )}
                </Text>
                {Boolean(item?.verified) && (
                  <View tw="ml-1">
                    <VerificationBadge size={14} />
                  </View>
                )}
                {/* {item?.follows_you ? (
                  <Chip label="Follows You" tw="ml-1 py-1" />
                ) : null} */}
              </View>
            </View>
          </View>
        </Link>
        <View tw="max-w-[120px]">
          <FollowButton
            profileId={item?.profile_id}
            name={item?.name}
            onToggleFollow={onToggleFollow}
          />
        </View>
      </View>
    );
  }
);
FollowingListUser.displayName = "FollowingListUser";

const FollowingUserItemLoadingIndicator = () => {
  const colorMode = useColorScheme();

  return (
    <View tw="px-4">
      {new Array(8).fill(0).map((_, i) => {
        return (
          <View tw="flex-row pt-4" key={`${i}`}>
            <View tw="mr-2 overflow-hidden rounded-full">
              <Skeleton
                width={32}
                height={32}
                show
                colorMode={colorMode as any}
              />
            </View>
            <View>
              <Skeleton
                width={140}
                height={14}
                show
                colorMode={colorMode as any}
              />
              <View tw="h-1" />
              <Skeleton
                width={90}
                height={14}
                show
                colorMode={colorMode as any}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
