import React, { FC, memo } from 'react';
import styles from './AvatarGroup.module.scss';
import UserAvatarThumbnail from '@/design-system/_components/thumbnail/UserAvatarThumbnail';

interface AvatarGroupProps {
  avatars: { src: string; alt: string }[];
  maxCount: number;  // Number of avatars to show before displaying the "+x"
}

const AvatarGroup: FC<AvatarGroupProps> = ({ avatars, maxCount }) => {
  const displayedAvatars = avatars.slice(0, maxCount).reverse();
  const remainingCount = avatars.length - maxCount;

  return (
    <div className={styles.avatarGroupContainer}>
    <div className={styles.avatarGroup}>
    {remainingCount > 0 && (
        <div className={styles.more}>+{remainingCount}</div>
      )}

      {displayedAvatars.map((avatar, index) => (
        <UserAvatarThumbnail imageUrl={avatar.src || ""} altText={avatar.alt || "Profile Name"} firstName = {"Profile"} lastName = {"Name"} style = {{width: 21, height: 21}} />
      ))}
    </div>
    </div>
  );
};

export default memo(AvatarGroup);
