import React from 'react'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas/schema'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {
    dashboardTool,
    sanityTutorialsWidget,
    projectUsersWidget,
    projectInfoWidget,
} from "@sanity/dashboard";
import { visionTool } from '@sanity/vision';

import structure from './structure';
import { Logo } from './utils/icons'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

export default defineConfig({
    name: 'GrowItRapid',
    projectId: projectId,
    dataset: dataset,
    title: 'GrowItRapid',
    basePath: '/admin/studio',
    studio: {
        components: {
            // logo: Logo,
        }
    },
    schema: {
        types: schemaTypes,
    },
    plugins: [
        deskTool({
            structure: structure
        }),
        dashboardTool({
            widgets: [
                sanityTutorialsWidget(),
                projectInfoWidget(),
                projectUsersWidget({
                    layout: {
                        width: 'medium',
                    }
                }),
            ]
        }),
        media(),
        unsplashImageAsset(),
        visionTool(),
        codeInput(),
        table(),
    ],
    form: {
        // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
        file: {
            assetSources: previousAssetSources => {
                return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource)
            }
        },
    },
})