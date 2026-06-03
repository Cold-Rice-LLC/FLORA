import {AddIcon, EditIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {IntentLink, useRouter} from 'sanity/router'
import {useClient} from 'sanity'

export function ProjectPhasesView({document: sanityDocument}) {
  const rawId = sanityDocument?.displayed?._id ?? ''
  const projectId = rawId.replace('drafts.', '')

  const [phases, setPhases] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const client = useClient({apiVersion: '2024-01-01'})
  const router = useRouter()

  const fetchPhases = useCallback(() => {
    if (!projectId) return
    setLoading(true)
    client
      .fetch(
        `*[_type == "phase" && project._ref == $projectId && !(_id in path("drafts.**"))]
          | order(category.order asc) {
            _id,
            "categoryTitle": category->titleEn,
            "categoryTitleEs": category->titleEs,
            "categoryOrder": category->order,
            "moduleCount": count(modules)
          }`,
        {projectId},
      )
      .then((result) => {
        setPhases(result)
        setLoading(false)
      })
  }, [client, projectId])

  useEffect(() => {
    fetchPhases()
  }, [fetchPhases])

  const handleAddPhase = useCallback(async () => {
    if (!projectId) return
    setCreating(true)
    try {
      const newPhase = await client.create({
        _type: 'phase',
        project: {_type: 'reference', _ref: projectId},
      })
      router.navigateIntent('edit', {id: newPhase._id, type: 'phase'})
    } catch (err) {
      console.error('Failed to create phase:', err)
      setCreating(false)
    }
  }, [client, projectId, router])

  if (!projectId) {
    return (
      <Box padding={4}>
        <Text muted>Save the project before managing phases.</Text>
      </Box>
    )
  }

  return (
    <Box padding={4}>
      <Stack space={4}>

        <Flex justify="space-between" align="center">
          <Text size={2} weight="semibold">
            Phases ({phases.length})
          </Text>
          <Button
            text="Add Phase"
            icon={AddIcon}
            tone="primary"
            loading={creating}
            disabled={creating}
            onClick={handleAddPhase}
          />
        </Flex>

        {loading ? (
          <Flex justify="center" padding={6}>
            <Spinner />
          </Flex>
        ) : phases.length === 0 ? (
          <Card border radius={2} padding={4}>
            <Text muted align="center">
              No phases yet. Click "Add Phase" to get started.
            </Text>
          </Card>
        ) : (
          <Stack space={2}>
            {phases.map((phase) => (
              <Card key={phase._id} border radius={2} padding={3}>
                <Flex align="center" justify="space-between">
                  <Stack space={1}>
                    <Text weight="semibold">
                      [{phase.categoryOrder}] {phase.categoryTitleEs} / {phase.categoryTitle}
                    </Text>
                    <Text size={1} muted>
                      {phase.moduleCount ?? 0} module{phase.moduleCount === 1 ? '' : 's'}
                    </Text>
                  </Stack>
                  <IntentLink
                    intent="edit"
                    params={{id: phase._id, type: 'phase'}}
                    style={{textDecoration: 'none'}}
                  >
                    <Button text="Edit" icon={EditIcon} mode="ghost" as="span" />
                  </IntentLink>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}

        {phases.length > 0 && (
          <Button
            text="Refresh"
            mode="ghost"
            onClick={fetchPhases}
            style={{alignSelf: 'flex-start'}}
          />
        )}

      </Stack>
    </Box>
  )
}
