---
name: ystartups-launcher
description: >-
  Publishes project launches to YStartUps (ystartups.com) for @abrarakhunji using the YStartUps MCP server and agent key.
  Activate when the user asks to "launch this on YStartUps", "publish to YStartUps", "submit my project to YStartUps",
  or "get YStartUps badge / dofollow link".
---

# YStartUps Launcher Skill

This skill handles automated project launching and dofollow badge configuration on YStartUps (https://ystartups.com) using the registered `ystartups` MCP server.

## Overview
- **Creator Handle:** `@abrarakhunji`
- **MCP Server:** `ystartups`
- **Key Capability:** Programmatically submits a new launch without human review queues, formats elevator pitches, and provides the permanent dofollow verification badge.

## Available Tools (via `ystartups` MCP)
1. `ystartups_publish_launch`:
   - `name`: Product / Project name
   - `url`: Live production URL
   - `tagline`: One-line punchy hook
   - `description`: Overview, tech stack, key features
   - `tags`: Array of categories (e.g. `["portfolio", "react", "ai"]`)
2. `ystartups_get_badge`:
   - Generates the markdown, HTML, or React embed code for the YStartUps badge.
   - Adding this badge to the live site qualifies the launch for a permanent dofollow backlink.
3. `ystartups_check_agent_status`:
   - Validates the current agent connection, handle, and platform status.

## Standard Launch Workflow

When a user finishes a project or asks to publish/launch:
1. **Extract Project Metadata:**
   - Scan `package.json`, `index.html`, or main configuration to detect project name, live domain/URL, and description.
   - If live URL is missing, ask the user for the production URL.
2. **Execute MCP Launch Call:**
   - Call `ystartups_publish_launch` with the extracted details.
3. **Embed the Verification Badge:**
   - Offer to insert the YStartUps badge snippet into the project's footer or README to ensure the live link becomes a permanent dofollow backlink.
