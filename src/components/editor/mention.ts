import axios from "axios";

export function getUsers(query: any) {
    return new Promise(resolve => {
        axios.post("/api/global/find", { query, usersOnly: true }).then(res => {
            const newData = res.data.users.map((user: any) => {
                return {
                    ...user,
                    id: `@${user.name}`,
                    link: `/u/${user._id}`,
                }
            });
            resolve(newData);
        });
    });
}

/*
 * This plugin customizes the way mentions are handled in the editor model and data.
 * Instead of a classic <span class="mention"></span>,
 */
export function MentionLinksPlugin(editor: any) {

    editor.conversion.for('upcast').elementToAttribute({
        view: {
            name: 'a',
            key: 'data-mention',
            classes: 'mention',
            attributes: {
                href: true,
                // For user
                'data-user-id': true,
                'data-user-name': true,
                'data-user-email': true,
                'data-user-image': true,
                'data-user-bio': true,

                // For posts
                'data-post-id': true,
                'data-post-title': true,
                'data-post-subTitle': true,
                'data-post-banner': true,
            }
        },
        model: {
            key: 'mention',
            value: (viewItem: any) => {

                const mentionAttribute = editor.plugins.get('Mention').toMentionAttribute(viewItem, {
                    // Add any other properties that you need.
                    link: viewItem.getAttribute('href'),
                    // For user
                    userId: viewItem.getAttribute('data-user-id'),
                    name: viewItem.getAttribute('data-user-name'),
                    email: viewItem.getAttribute('data-user-email'),
                    image: viewItem.getAttribute('data-user-image'),
                    bio: viewItem.getAttribute('data-user-bio'),
                    // For posts
                    postId: viewItem.getAttribute('data-post-id'),
                    title: viewItem.getAttribute('data-post-title'),
                    subTitle: viewItem.getAttribute('data-post-subTitle'),
                    banner: viewItem.getAttribute('data-post-banner'),
                });

                return mentionAttribute;
            }
        },
        converterPriority: 'high'
    });

    editor.conversion.for('downcast').attributeToElement({
        model: 'mention',
        view: (modelAttributeValue: any, { writer }: { writer: any }) => {
            // Do not convert empty attributes (lack of value means no mention).
            if (!modelAttributeValue) {
                return;
            }

            return writer.createAttributeElement('a', {
                class: 'mention',
                'data-user-id': modelAttributeValue.id,
                'data-mention': modelAttributeValue.email,

                'data-user-name': modelAttributeValue.name,
                'data-user-email': modelAttributeValue.email,
                'data-user-image': modelAttributeValue.image,
                'data-user-bio': modelAttributeValue.bio,

                'data-post-id': modelAttributeValue.id,
                'data-post-title': modelAttributeValue.title,
                'data-post-subTitle': modelAttributeValue.subTitle,
                'data-post-banner': modelAttributeValue.banner,

                href: modelAttributeValue.link
            }, {
                // Make mention attribute to be wrapped by other attribute elements.
                priority: 20,
                // Prevent merging mentions together.
                id: modelAttributeValue._id
            });
        },
        converterPriority: 'high'
    });
}

export function customUserItemRenderer(item: any) {

    const parentElement = document.createElement('span');
    parentElement.classList.add('custom-item');
    parentElement.id = `mention-list-item-id-${item.email}`;
    // Style
    parentElement.style.display = 'block';
    parentElement.style.padding = '5px';
    parentElement.style.position = 'relative';

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('avatar');
    avatarElement.alt = item.name;
    avatarElement.referrerPolicy = 'no-referrer';
    // Style
    avatarElement.style.width = '40px';
    avatarElement.style.height = '40px';
    avatarElement.style.borderRadius = '50%';
    avatarElement.style.position = 'relative';
    avatarElement.style.marginRight = '5px';
    avatarElement.style.display = 'none';
    // Manage Image
    const avatarAltElement = document.createElement('div');
    avatarAltElement.classList.add('avatar');
    avatarAltElement.innerText = String(item.name)[0];
    // Style
    avatarAltElement.style.width = '40px';
    avatarAltElement.style.height = '40px';
    avatarAltElement.style.borderRadius = '50%';
    avatarAltElement.style.position = 'relative';
    avatarAltElement.style.marginRight = '5px';
    avatarAltElement.style.display = 'inline-grid';
    avatarAltElement.style.placeItems = 'center';
    avatarAltElement.style.fontSize = '20px';
    avatarAltElement.style.backgroundColor = `#${((1 << 24) * Math.random() | 0).toString(16)}`;
    // Conditions
    const Img = new Image();
    Img.onload = (e) => {
        avatarElement.src = item.image;
        avatarAltElement.style.display = 'none';
        avatarElement.style.display = 'inline-grid';
    }
    Img.onerror = (err) => {
        avatarElement.style.display = 'none';
        avatarAltElement.style.display = 'inline-grid';
    }
    Img.referrerPolicy = 'no-referrer';
    Img.src = item.image;
    // append
    parentElement.appendChild(avatarElement);
    parentElement.appendChild(avatarAltElement);

    const userElement = document.createElement('span');
    userElement.classList.add('custom-item-username');
    // Style
    userElement.style.display = 'inline-block';
    // append
    parentElement.appendChild(userElement);

    const nameElement = document.createElement('span');
    nameElement.classList.add('custom-item-name');
    nameElement.innerText = item.name;
    // Style
    nameElement.style.fontSize = '14px';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.lineHeight = '1.5';
    nameElement.style.display = 'block';
    // append
    userElement.appendChild(nameElement);

    const emailElement = document.createElement('span');
    emailElement.classList.add('custom-item-email');
    emailElement.textContent = item.email;
    // Style
    emailElement.style.fontSize = '12px';
    emailElement.style.lineHeight = '1';
    emailElement.style.display = 'block';
    // append
    userElement.appendChild(emailElement);

    return parentElement;
}


export function getPosts(query: any) {
    return new Promise(resolve => {
        axios.post("/api/global/find", { query, postsOnly: true }).then(res => {
            const newData = res.data.posts.map((post: any) => {
                return {
                    ...post,
                    id: `#${post.title}`,
                    link: `/post/${post.slug}`,
                }
            });
            resolve(newData);
        });
    });
}

export function customPostItemRenderer(item: any) {

    const parentElement = document.createElement('span');
    parentElement.classList.add('custom-item');
    parentElement.id = `mention-list-item-id-${item.title}`;
    // Style
    parentElement.style.display = 'block';
    parentElement.style.padding = '5px';
    parentElement.style.position = 'relative';

    const bannerElement = document.createElement('img');
    bannerElement.classList.add('banner');
    bannerElement.alt = item.title;
    bannerElement.referrerPolicy = 'no-referrer';
    // Style
    bannerElement.style.width = '40px';
    bannerElement.style.height = '40px';
    bannerElement.style.borderRadius = '5px';
    bannerElement.style.position = 'relative';
    bannerElement.style.marginRight = '5px';
    bannerElement.style.display = 'none';
    // Manage Image
    const bannerAltElement = document.createElement('div');
    bannerAltElement.classList.add('banner');
    bannerAltElement.innerText = String(item.title)[0];
    // Style
    bannerAltElement.style.width = '40px';
    bannerAltElement.style.height = '40px';
    bannerAltElement.style.borderRadius = '5px';
    bannerAltElement.style.position = 'relative';
    bannerAltElement.style.marginRight = '5px';
    bannerAltElement.style.display = 'inline-grid';
    bannerAltElement.style.placeItems = 'center';
    bannerAltElement.style.fontSize = '20px';
    bannerAltElement.style.backgroundColor = `#${((1 << 24) * Math.random() | 0).toString(16)}`;
    // Conditions
    const Img = new Image();
    Img.onload = (e) => {
        bannerElement.src = item.banner;
        bannerAltElement.style.display = 'none';
        bannerElement.style.display = 'inline-grid';
    }
    Img.onerror = (err) => {
        bannerElement.style.display = 'none';
        bannerAltElement.style.display = 'inline-grid';
    }
    Img.referrerPolicy = 'no-referrer';
    Img.src = item.banner;
    // append
    parentElement.appendChild(bannerElement);
    parentElement.appendChild(bannerAltElement);

    const userElement = document.createElement('span');
    userElement.classList.add('custom-item-username');
    // Style
    userElement.style.display = 'inline-block';
    // append
    parentElement.appendChild(userElement);

    const titleElement = document.createElement('span');
    titleElement.classList.add('custom-item-title');
    titleElement.innerText = item.title;
    // Style
    titleElement.style.fontSize = '14px';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.lineHeight = '1.5';
    titleElement.style.display = 'block';
    // append
    userElement.appendChild(titleElement);

    const subTitle = document.createElement('span');
    subTitle.classList.add('custom-item-sub-title');
    subTitle.textContent = item.subTitle;
    // Style
    subTitle.style.fontSize = '12px';
    subTitle.style.lineHeight = '1';
    subTitle.style.display = 'block';
    // append
    userElement.appendChild(subTitle);

    return parentElement;
}

