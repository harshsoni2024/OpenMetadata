/*
 *  Copyright 2024 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { Button, Tooltip, Typography } from 'antd';
import { AxiosError } from 'axios';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ReactComponent as IconEdit } from '../../../assets/svg/edit-new.svg';
import { DE_ACTIVE_COLOR, ICON_DIMENSION } from '../../../constants/constants';
import { showErrorToast } from '../../../utils/ToastUtils';
import EntityNameModal from '../../Modals/EntityNameModal/EntityNameModal.component';
import { EntityName } from '../../Modals/EntityNameModal/EntityNameModal.interface';
import { DisplayNameProps } from './DisplayName.interface';

const DisplayName: React.FC<DisplayNameProps> = ({
  id,
  name,
  displayName,
  onEditDisplayName,
  link,
  allowRename,
}) => {
  const { t } = useTranslation();

  const [isDisplayNameEditing, setIsDisplayNameEditing] = useState(false);

  const handleDisplayNameUpdate = async (data: EntityName) => {
    setIsDisplayNameEditing(true);
    try {
      await onEditDisplayName?.(data, id);
    } catch (error) {
      showErrorToast(error as AxiosError);
    } finally {
      setIsDisplayNameEditing(false);
    }
  };

  return (
    <div className="flex-column hover-icon-group w-max-full">
      <Typography.Text
        className="m-b-0 d-block text-grey-muted break-word"
        data-testid="column-name">
        {isEmpty(displayName) ? (
          <Link className="break-word" data-testid={name} to={link}>
            {name}
          </Link>
        ) : (
          <>
            {name}
            <Typography.Text
              className="m-b-0 d-block break-word"
              data-testid="column-display-name">
              <Link className="break-word" data-testid={name} to={link}>
                {displayName}
              </Link>
            </Typography.Text>
          </>
        )}
      </Typography.Text>

      {allowRename ? (
        <Tooltip placement="right" title={t('label.edit')}>
          <Button
            ghost
            className="hover-cell-icon"
            data-testid="edit-displayName-button"
            icon={<IconEdit color={DE_ACTIVE_COLOR} {...ICON_DIMENSION} />}
            type="text"
            onClick={() => setIsDisplayNameEditing(true)}
          />
        </Tooltip>
      ) : null}
      {isDisplayNameEditing && (
        <EntityNameModal
          allowRename={allowRename}
          entity={{
            name: name ?? '',
            displayName,
          }}
          title={t('label.edit-entity', {
            entity: t('label.display-name'),
          })}
          visible={isDisplayNameEditing}
          onCancel={() => setIsDisplayNameEditing(false)}
          onSave={handleDisplayNameUpdate}
        />
      )}
    </div>
  );
};

export default DisplayName;