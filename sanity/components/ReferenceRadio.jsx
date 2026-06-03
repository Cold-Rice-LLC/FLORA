import {Box, Card, Flex, Radio, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {set, unset, useClient} from 'sanity'

export function ReferenceRadio(props) {
  const [categories, setCategories] = useState([])
  const client = useClient({apiVersion: '2024-01-01'})

  useEffect(() => {
    client
      .fetch(`*[_type == "phaseCategory" && !(_id in path("drafts.**"))] | order(order asc) { _id, titleEs, titleEn, order }`)
      .then(setCategories)
  }, [client])

  const handleChange = useCallback(
    (id) => {
      if (props.value?._ref === id) {
        props.onChange(unset())
      } else {
        props.onChange(set({_type: 'reference', _ref: id}))
      }
    },
    [props],
  )

  return (
    <Stack space={2}>
      {categories.map((category) => {
        const isSelected = props.value?._ref === category._id
        const inputId = `phase-category-${category._id}`
        return (
          <Card key={category._id} padding={2}>
            <Flex align="center" gap={3}>
              <Radio
                id={inputId}
                name="phase-category"
                checked={isSelected}
                onChange={() => handleChange(category._id)}
              />
              <Box flex={1}>
                <Text>
                  <label htmlFor={inputId}>
                    [{category.order}] {category.titleEs} / {category.titleEn}
                  </label>
                </Text>
              </Box>
            </Flex>
          </Card>
        )
      })}
    </Stack>
  )
}
