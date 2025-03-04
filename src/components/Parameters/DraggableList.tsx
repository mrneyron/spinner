import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  TouchSensor,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { Card } from '../Card';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { GiftType, ListGifts } from '../../store/parameters/model/types.tsx';
import Message from '../Message/index.tsx';
import { GiftListOpened } from './List.tsx';

export const DraggableList = () => {
  const [listStorage, setListStorage] = useLocalStorage<ListGifts>('list', []);
  const [activeItem, setActiveItem] = useState<GiftType>();
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(listStorage.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = listStorage.find((item) => item.id === active.id);
    const overItem = listStorage.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = listStorage.findIndex((item) => item.id === active.id);
    const overIndex = listStorage.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setListStorage((prev) =>
        arrayMove<GiftType>(prev, activeIndex, overIndex)
      );
    }
    setActiveItem(undefined);
    setOpenMessage(true);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={listStorage} strategy={rectSortingStrategy}>
          <GiftListOpened listStorage={listStorage} isCanDrag />
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeItem ? (
            <Card open item={activeItem} isDragging isCanDrag />
          ) : null}
        </DragOverlay>
      </DndContext>
      <Message
        title={'Настройки порядка сохранены'}
        message={`вот так:${listStorage.map((item, key) => ` ${key + 1}: ${item.name}`)}`}
        open={openMessage}
        setOpen={setOpenMessage}
      />
    </>
  );
};
