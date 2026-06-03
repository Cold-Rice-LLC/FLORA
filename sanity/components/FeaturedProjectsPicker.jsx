import {Box, Button, Card, Checkbox, Flex, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {set, useClient} from 'sanity'
import {DndContext, closestCenter, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

function SortableItem({id, index, project, total, onRemove}) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} border radius={2} padding={3}>
      <Flex align="center" gap={3}>
        {/* Drag handle */}
        <Box
          {...attributes}
          {...listeners}
          style={{cursor: 'grab', color: '#aaa', userSelect: 'none', fontSize: '16px'}}
        >
          ⠿
        </Box>
        <Box flex={1}>
          <Text>
            {index + 1}. {project.projectNumber ? `[${project.projectNumber}] ` : ''}
            {project.title}
          </Text>
        </Box>
        <Button text="×" mode="ghost" tone="critical" padding={2} onClick={() => onRemove(id)} style={{cursor: 'pointer'}} />
      </Flex>
    </Card>
  )
}

export function FeaturedProjectsPicker(props) {
  const [allProjects, setAllProjects] = useState([])
  const client = useClient({apiVersion: '2024-01-01'})

  useEffect(() => {
    client
      .fetch(
        `*[_type == "project" && !(_id in path("drafts.**"))] | order(title asc) { _id, title, projectNumber }`,
      )
      .then(setAllProjects)
  }, [])

  const uniqueProjects = [...new Map(allProjects.map((p) => [p._id, p])).values()]
  const selectedRefs = props.value ?? []
  const isSelected = (id) => selectedRefs.some((ref) => ref._ref === id)
  const getProject = (ref) => uniqueProjects.find((p) => p._id === ref._ref)

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = useCallback(
    (event) => {
      const {active, over} = event
      if (!over || active.id === over.id) return
      const oldIndex = selectedRefs.findIndex((ref) => ref._ref === active.id)
      const newIndex = selectedRefs.findIndex((ref) => ref._ref === over.id)
      props.onChange(set(arrayMove([...selectedRefs], oldIndex, newIndex)))
    },
    [props, selectedRefs],
  )

  const handleToggle = useCallback(
    (project) => {
      const exists = isSelected(project._id)
      const newValue = exists
        ? selectedRefs.filter((ref) => ref._ref !== project._id)
        : [...selectedRefs, {_key: project._id.slice(0, 10), _type: 'reference', _ref: project._id}]
      props.onChange(set(newValue))
    },
    [props, selectedRefs],
  )

  const handleRemove = useCallback(
    (id) => {
      props.onChange(set(selectedRefs.filter((ref) => ref._ref !== id)))
    },
    [props, selectedRefs],
  )

  return (
    <Flex gap={4} align="flex-start" style={{marginTop: '8px'}}>
      {/* Left: pool */}
      <Stack space={2} style={{flex: 1}}>
        <Text size={1} weight="semibold" muted>
          All Projects
        </Text>
        <Card
          border
          radius={2}
          padding={3}
          style={{minHeight: '200px', maxHeight: '400px', overflowY: 'auto'}}
        >
          <Stack space={2}>
            {uniqueProjects.length === 0 && (
              <Text muted size={1}>
                No projects found.
              </Text>
            )}
            {uniqueProjects.map((project) => (
              <Flex key={project._id} align="center" gap={3}>
                <Checkbox
                  id={`pick-${project._id}`}
                  checked={isSelected(project._id)}
                  onChange={() => handleToggle(project)}
                  style={{cursor: 'pointer'}}
                />
                <Text>
                  <label htmlFor={`pick-${project._id}`} style={{cursor: 'pointer'}}>
                    {project.projectNumber ? `[${project.projectNumber}] ` : ''}
                    {project.title}
                  </label>
                </Text>
              </Flex>
            ))}
          </Stack>
        </Card>
      </Stack>

      {/* Right: selected & ordered */}
      <Stack space={2} style={{flex: 1}}>
        <Text size={1} weight="semibold" muted>
          Featured ({selectedRefs.length})
        </Text>
        {selectedRefs.length === 0 ? (
          <Card border radius={2} padding={3}>
            <Text muted size={1}>
              No projects selected yet.
            </Text>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedRefs.map((ref) => ref._ref)}
              strategy={verticalListSortingStrategy}
            >
              <Stack space={1}>
                {selectedRefs.map((ref, index) => {
                  const project = getProject(ref)
                  if (!project) return null
                  return (
                    <SortableItem
                      key={ref._ref}
                      id={ref._ref}
                      index={index}
                      project={project}
                      total={selectedRefs.length}
                      onRemove={handleRemove}
                    />
                  )
                })}
              </Stack>
            </SortableContext>
          </DndContext>
        )}
      </Stack>
    </Flex>
  )
}
