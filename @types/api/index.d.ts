interface CreateReportDto {
    reason: string;
}

interface EchoDto {
    id: number;
    uuid: string;
    content: string;
    createdTime: Date;
    updatedTime: Date;
}

interface Email {
    to: string;
    subject: string;
    content: string;
}

interface EnumDataDto {
    description: string;
    value: string;
}

interface InitDto {}

interface PageDto<M> {
    current: number;
    total: number;
    desire_size: number;
    current_size: number;
    data: M[];
}

interface Converter<M, N> {}

interface ResponseDto<T> {
    code: string;
    message: string;
    data: T;
    is_failure: boolean;
    attachments: string[];
    _failure: boolean;
}

interface UpvoteDto {
    id: number;
    uuid: string;
    type: UpvoteType;
    upvote_num: number;
}

interface CommentDto {
    id: number;
    uuid: string;
    user: UserBriefInfoDto;
    project_id: number;
    paragraph: ParagraphDto;
    content: string;
    topic: CommentTopicDto;
    eldest_sub_comment: SubCommentDto;
    second_sub_comment: SubCommentDto;
    comment_num: number;
    coin_num: number;
    upvote_num: number;
    status: Status;
    created_time: Date;
    updated_time: Date;
}

interface CommentTopicDto {
    id: number;
    uuid: string;
    user_id: number;
    project_id: number;
    top_id: number;
    content: string;
    status: Status;
    created_time: Date;
    updated_time: Date;
}

interface CreateCommentDto {
    paragraph_id: number;
    topic_id: number;
    content: string;
}

interface CreateSubCommentDto {
    paragraph_id: number;
    content: string;
}

interface SubCommentDto {
    id: number;
    uuid: string;
    user: UserBriefInfoDto;
    replyUser: UserBriefInfoDto;
    project_id: number;
    paragraph: ParagraphDto;
    root_comment_id: number;
    content: string;
    comment_num: number;
    coin_num: number;
    upvote_num: number;
    status: Status;
    created_time: Date;
    updated_time: Date;
}

interface ComponentDto {}

interface CreateParagraphDto {
    position: number;
    content: string;
    type: ComponentType;
}

interface CreateReferenceDto {
    project_id: number;
    position: number;
    target_type: string;
    target_id: string;
}

interface CreateTextComponentDto {
    content: string;
}

interface CreateTextModificationDto {
    content: string;
}

interface ParagraphDto {
    id: number;
    uuid: string;
    user_id: number;
    project_id: number;
    position: number;
    component: ComponentDto;
    component_type: ComponentType;
    component_uuid: string;
    status: ParagraphStatus;
    created_time: Date;
    updated_time: Date;
}

interface TextDto extends ComponentDto {
    id: number;
    uuid: string;
    user_id: number;
    content: string;
    status: Status;
    created_time: Date;
    updated_time: Date;
}

interface TextModificationDto {
    id: number;
    uuid: string;
    user_id: number;
    text_id: number;
    content: string;
    status: ModificationStatus;
    created_time: Date;
    updated_time: Date;
}

interface CreateProjectDto {
    title: string;
    description: string;
    tagIds: number[];
    visibility: Visibility;
}

interface CreateProjectTagDto {
    name: string;
}

interface ProjectDto {
    id: number;
    title: string;
    description: string;
    user: UserBriefInfoDto;
    contributors: UserBriefInfoDto[];
    tags: ProjectTagDto[];
    coin_num: number;
    participant_num: number;
    upvote_num: number;
    visibility: Visibility;
    status: Status;
    createdTime: Date;
    updatedTime: Date;
}

interface ProjectTagDto {
    id: number;
    description: string;
    uuid: string;
    name: string;
}

interface CreateUserDto {}

interface LoginDto {
    account: string;
    password: string;
    auth_type: AuthType;
    code: string;
}

interface LoginSystemUserDto {
    id: number;
    nickname: string;
    token: string;
    roles: string[];
    status: Status;
}

interface LoginUserDto {
    id: number;
    uuid: string;
    email: string;
    phone: string;
    username: string;
    gender: Gender;
    avatar: string;
    signature: string;
    nickname: string;
    project_num: number;
    comment_num: number;
    coin_num: number;
    upvote_num: number;
    experience_point: number;
    setting_json: string;
    token: string;
    roles: Role[];
    status: Status;
    created_time: Date;
}

interface RegisterDto {
    account: string;
    password: string;
    code: number;
    username: string;
}

interface SystemLoginDto {
    account: string;
    password: string;
}

interface TokenDto {
    token: string;
}

interface UpdateUserAuthDto {
    password: string;
}

interface UpdateUserDto {
    nickname: string;
    gender: Gender;
    avatar: string;
    signature: string;
}

interface UpdateUserRoleDto {
    roles: string[];
}

interface UserAuthInfoDto {
    id: number;
    uuid: string;
    email: string;
    phone: string;
    username: string;
    gender: string;
    avatar: string;
    signature: string;
    nickname: string;
    project_num: string;
    comment_num: string;
    coin_num: string;
    upvote_num: string;
    experience_point: string;
    setting_json: string;
    token: string;
    roles: string[];
    status: string;
    created_time: string;
}

interface UserBriefInfoDto {
    id: number;
    username: string;
    gender: Gender;
    avatar: string;
    signature: string;
    nickname: string;
    experience_point: number;
}

interface UserDto {
    id: number;
    username: string;
    gender: Gender;
    avatar: string;
    signature: string;
    nickname: string;
    experience_point: number;
}

interface VerificationCodeDto {
    code: number;
    account: string;
}

interface EnumDataInterface {
    value: string;
    description: string;
}

type EnumData =
    | "AUTHENTICATION_STATUS"
    | "MODIFICATION_STATUS"
    | "PARAGRAPH_STATUS"
    | "STATUS"
    | "VISIBILITY"
    | "ACCOUNT_TYPE"
    | "AUTH_TYPE"
    | "COMPONENT_TYPE"
    | "CONTACT_TYPE"
    | "GENDER"
    | "REPORT_TYPE"
    | "ROLE"
    | "UPVOTE_TYPE";

type AuthenticationStatus = "NORMAL" | "EXPIRED" | "INVALID" | "NEED_REFRESH";

type ModificationStatus = "NORMAL" | "BANNED" | "DELETED" | "PEND_REVIEW" | "REVIEW_FAILED";

type ParagraphStatus = "NORMAL" | "BANNED" | "DELETED" | "PEND_REVIEW" | "REVIEW_FAILED";

type Status = "NORMAL" | "BANNED" | "DELETED";

type Visibility = "PUBLIC" | "PRIVATE";

type AccountType = "EMAIL" | "PHONE" | "USERNAME";

type AuthType = "PASSWORD" | "TOKEN" | "CODE" | "WECHAT" | "QQ";

type ComponentType = "TEXT" | "IMAGE" | "PROJECT" | "PARAGRAPH" | "USER" | "COMMENT";

type ContactType = "EMAIL" | "PHONE" | "UNKNOWN";

type Gender = "MALE" | "FEMALE" | "UNKNOWN";

type ReportType = "COMMENT" | "COMMENT_TOPIC" | "PROJECT" | "PROJECT_TAG" | "USER" | "TEXT_MODIFICATION" | "SUB_COMMENT" | "REFERENCE";

type Role = "ANONYMOUS" | "USER" | "MANAGER" | "SYSTEM";

type UpvoteType = "COMMENT" | "COMMENT_TOPIC" | "PROJECT" | "PROJECT_TAG" | "USER" | "TEXT_MODIFICATION" | "SUB_COMMENT" | "REFERENCE";
